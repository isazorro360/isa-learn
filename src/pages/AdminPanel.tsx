import { BarChart3, CloudUpload, Edit3, FilePlus, Loader2, Trash2, Users2, Wifi } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { deletePastQuestion, fetchPastQuestions, updatePastQuestion } from '../services/firestore';
import { deleteStorageFile } from '../services/storage';
import { fetchAllUsers, updateUserRoles } from '../services/users';
import type { PastQuestionDoc, UserProfileDoc } from '../types';
import { subjects } from '../data';
import { sendSignInLinkToEmail } from 'firebase/auth';
const actionCodeSettings = { url: 'http://localhost:4170/auth', handleCodeInApp: true };

const adminMetrics = [
  { label: 'Active users', value: '2,300', icon: Users2, accent: 'bg-sky-600' },
  { label: 'Resources uploaded', value: '620', icon: FilePlus, accent: 'bg-emerald-600' },
  { label: 'Subjects managed', value: '8', icon: Wifi, accent: 'bg-violet-600' },
  { label: 'Total downloads', value: '18.9K', icon: BarChart3, accent: 'bg-amber-500' },
];

function AdminPanel() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'subjects' | 'resources'>('overview');
  const [resourcesList, setResourcesList] = useState<PastQuestionDoc[]>([]);
  const [subjectsList] = useState(subjects);
  const [loadingResources, setLoadingResources] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [userProfiles, setUserProfiles] = useState<UserProfileDoc[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserProfileDoc | null>(null);
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
  const [editingResource, setEditingResource] = useState<PastQuestionDoc | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const loadResources = async () => {
      setLoadingResources(true);
      try {
        const fetched = await fetchPastQuestions({});
        setResourcesList(fetched);
      } catch (err) {
        console.error(err);
        setFeedback('Unable to load uploaded resources at the moment.');
      } finally {
        setLoadingResources(false);
      }
    };

    loadResources();
  }, []);

  useEffect(() => {
    if (!isAdmin) {
      return;
    }

    const loadUsers = async () => {
      setLoadingUsers(true);
      try {
        const users = await fetchAllUsers();
        setUserProfiles(users);
      } catch (err) {
        console.error(err);
        setFeedback('Unable to load user role assignments.');
      } finally {
        setLoadingUsers(false);
      }
    };

    loadUsers();
  }, [isAdmin]);

  const handleDeleteResource = async (resource: PastQuestionDoc) => {
    setFeedback('');
    try {
      if (resource.storagePath) {
        await deleteStorageFile(resource.storagePath);
      }
      await deletePastQuestion(resource.id);
      setResourcesList((prev) => prev.filter((item) => item.id !== resource.id));
      setFeedback('Resource deleted successfully.');
    } catch (err) {
      console.error(err);
      setFeedback('Failed to delete resource.');
    }
  };

  const startEditResource = (resource: PastQuestionDoc) => {
    setEditingResource(resource);
    setEditTitle(resource.title);
    setEditDescription(resource.description);
    setFeedback('');
  };

  const toggleAdminStatus = async (user: UserProfileDoc) => {
    setFeedback('');
    setUpdatingUserId(user.id);

    try {
      const nextRoles = user.roles.includes('admin')
        ? user.roles.filter((role) => role !== 'admin')
        : [...user.roles, 'admin'];

      await updateUserRoles(user.id, nextRoles);
      setUserProfiles((prev) =>
        prev.map((item) => (item.id === user.id ? { ...item, roles: nextRoles } : item))
      );
      setFeedback(`Updated roles for ${user.email}.`);
    } catch (err) {
      console.error(err);
      setFeedback('Unable to update user roles at this time.');
    } finally {
      setUpdatingUserId(null);
    }
  };

  const handleSaveEdit = async () => {
    if (!editingResource) return;
    setFeedback('');

    try {
      await updatePastQuestion(editingResource.id, {
        title: editTitle,
        description: editDescription,
      });
      setResourcesList((prev) =>
        prev.map((resource) =>
          resource.id === editingResource.id
            ? { ...resource, title: editTitle, description: editDescription }
            : resource
        )
      );
      setEditingResource(null);
      setFeedback('Resource updated successfully.');
    } catch (err) {
      console.error(err);
      setFeedback('Failed to update resource details.');
    }
  };

  if (authLoading) {
    return (
      <div className="layout py-24 text-center">
        <Loader2 className="mx-auto mb-4 h-10 w-10 animate-spin text-sky-600" />
        <p className="text-slate-600 dark:text-slate-300">Checking admin access…</p>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="layout py-24">
        <section className="rounded-[2rem] border border-rose-200 bg-rose-50 p-10 text-center text-rose-700 shadow-sm dark:border-rose-800/40 dark:bg-rose-950/20 dark:text-rose-200">
          <p className="text-sm uppercase tracking-[0.24em] text-rose-600">Access denied</p>
          <h1 className="mt-4 text-3xl font-semibold">Admin access required</h1>
          <p className="mt-3 text-sm leading-7 text-rose-700/90 dark:text-rose-200/90">
            You need an administrator account to manage uploads and resources.
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className="layout space-y-10 pb-24 md:pb-10">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-sky-600">Admin panel</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">Manage content and analytics</h1>
            <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
              Upload past questions, edit resource details, and keep the student library fresh.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <Link to="/admin/uploads" className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700">
              <CloudUpload className="h-4 w-4" />
              Upload past questions
            </Link>
          </div>
        </div>
      </section>

      {feedback && (
        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
          {feedback}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {adminMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-3xl text-white ${metric.accent}`}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-6 text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">{metric.label}</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">{metric.value}</p>
            </div>
          );
        })}
      </div>

      {isAdmin && (
        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-sky-600">Admin team</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">Manage user roles</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">Grant or revoke admin access for users in your organization.</p>
            </div>
            <div className="rounded-full bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 dark:bg-slate-950 dark:text-slate-200">
              {userProfiles.length} users loaded
            </div>
          </div>

          {loadingUsers ? (
            <div className="mt-8 rounded-[2rem] border border-slate-200 bg-slate-50 p-8 text-center text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
              Loading user roles...
            </div>
          ) : (
            <div className="mt-8 grid gap-4">
              {userProfiles.map((profile) => (
                <div key={profile.id} className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">{profile.email}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{profile.displayName || 'No display name'}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">{profile.roles.join(', ')}</span>
                      <button
                        type="button"
                        onClick={() => toggleAdminStatus(profile)}
                        disabled={updatingUserId === profile.id}
                        className="rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:opacity-50"
                      >
                        {profile.roles.includes('admin') ? 'Revoke admin' : 'Grant admin'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      <div className="flex gap-2 rounded-full border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-900">
        {['overview', 'subjects', 'resources'].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab as 'overview' | 'subjects' | 'resources')}
            className={`flex-1 rounded-full px-6 py-3 text-sm font-semibold capitalize transition ${
              selectedTab === tab
                ? 'bg-sky-600 text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {selectedTab === 'overview' && (
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Platform Overview</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">Monitor student engagement, resource downloads, and platform performance in real-time.</p>
            <ul className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li>• Total students registered: 2,300</li>
              <li>• New signups this month: 340</li>
              <li>• Average daily active users: 1,240</li>
              <li>• Premium subscribers: 380</li>
            </ul>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-100 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Resource Analytics</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">View which resources are most accessed and optimize your content strategy.</p>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Mathematics Notes</span>
                <span className="font-semibold text-slate-900 dark:text-white">3.4K views</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Biology Revision</span>
                <span className="font-semibold text-slate-900 dark:text-white">2.1K views</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Past Questions</span>
                <span className="font-semibold text-slate-900 dark:text-white">1.8K views</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'subjects' && (
        <div className="rounded-[2rem] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {subjectsList.map((subject) => (
              <div key={subject.id} className="flex items-center justify-between gap-4 px-8 py-6 first:rounded-t-3xl last:rounded-b-3xl">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{subject.icon}</div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{subject.title}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{subject.resources} resources</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">
                    Edit
                  </button>
                  <button className="rounded-full bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-200 dark:bg-rose-900/20 dark:text-rose-300 dark:hover:bg-rose-900/40">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedTab === 'resources' && (
        <div className="space-y-4 rounded-[2rem] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {loadingResources ? (
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-10 text-center text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
              <Loader2 className="mx-auto mb-4 h-10 w-10 animate-spin" />
              Loading uploaded resources...
            </div>
          ) : resourcesList.length === 0 ? (
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-10 text-center text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
              No uploaded past questions found yet.
            </div>
          ) : (
            resourcesList.map((resource) => (
              <div key={resource.id} className="flex items-center justify-between gap-4 border-b border-slate-200 px-8 py-5 last:border-b-0 dark:border-slate-800 first:rounded-t-3xl last:rounded-b-3xl">
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 dark:text-white">{resource.title}</p>
                  <div className="mt-1 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span>{resource.subject}</span>
                    <span>•</span>
                    <span>{resource.category}</span>
                    <span>•</span>
                    <span>{resource.year}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => startEditResource(resource)}
                    className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                  >
                    <Edit3 className="h-4 w-4" />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteResource(resource)}
                    className="rounded-full bg-rose-100 p-2 text-rose-600 transition hover:bg-rose-200 dark:bg-rose-900/20 dark:text-rose-300 dark:hover:bg-rose-900/40"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {editingResource && (
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Edit resource</h2>
          <div className="grid gap-4 pt-6 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Title</span>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Description</span>
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                rows={4}
                className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
              />
            </label>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleSaveEdit}
              className="inline-flex items-center gap-2 rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
            >
              Save changes
            </button>
            <button
              type="button"
              onClick={() => setEditingResource(null)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
