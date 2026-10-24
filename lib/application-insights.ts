import { ApplicationInsights } from "@microsoft/applicationinsights-web";

let appInsights: ApplicationInsights | undefined;
let lastTrackedPath: string | undefined;

export function trackPageView(pathname: string) {
  const connectionString =
    process.env.NEXT_PUBLIC_APPLICATIONINSIGHTS_CONNECTION_STRING;

  if (
    process.env.NODE_ENV !== "production" ||
    !connectionString ||
    typeof window === "undefined" ||
    lastTrackedPath === pathname
  ) {
    return;
  }

  if (!appInsights) {
    appInsights = new ApplicationInsights({
      config: {
        connectionString,
        // Next.js pathname changes are tracked manually to avoid duplicate views.
        enableAutoRouteTracking: false,
        samplingPercentage: 100,
      },
    });
    appInsights.loadAppInsights();
  }

  appInsights.trackPageView({
    name: pathname,
    uri: window.location.origin + pathname,
  });
  lastTrackedPath = pathname;
}
