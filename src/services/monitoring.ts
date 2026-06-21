const monitoringEndpoint = import.meta.env.VITE_MONITORING_ENDPOINT;

function serializeError(error: unknown) {
  if (error instanceof Error) {
    return {
      message: error.message,
      name: error.name,
      stack: error.stack,
    };
  }

  if (typeof error === 'object' && error !== null) {
    return JSON.stringify(error);
  }

  return String(error);
}

async function reportToEndpoint(error: unknown, context?: Record<string, unknown>) {
  if (!monitoringEndpoint) {
    return;
  }

  try {
    await fetch(monitoringEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: serializeError(error),
        context,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (reportError) {
    console.error('Monitoring report failed', reportError);
  }
}

export async function initMonitoring() {
  if (typeof window === 'undefined') {
    return;
  }

  window.addEventListener('error', (event) => {
    reportToEndpoint(event.error || event.message, { source: 'global-error' });
  });

  window.addEventListener('unhandledrejection', (event) => {
    reportToEndpoint(event.reason, { source: 'unhandled-rejection' });
  });
}
