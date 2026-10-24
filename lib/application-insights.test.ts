import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const telemetry = vi.hoisted(() => ({
  initialize: vi.fn(),
  loadAppInsights: vi.fn(),
  trackPageView: vi.fn(),
}));

vi.mock("@microsoft/applicationinsights-web", () => ({
  ApplicationInsights: class {
    constructor(options: unknown) {
      telemetry.initialize(options);
    }
    loadAppInsights = telemetry.loadAppInsights;
    trackPageView = telemetry.trackPageView;
  },
}));

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  vi.stubEnv("NODE_ENV", "production");
  vi.stubEnv(
    "NEXT_PUBLIC_APPLICATIONINSIGHTS_CONNECTION_STRING",
    "InstrumentationKey=00000000-0000-0000-0000-000000000000",
  );
  vi.stubGlobal("window", {
    location: {
      origin: "https://example.com",
      href: "https://example.com/?private=value#projects",
    },
  });
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("page view tracking", () => {
  it("counts the initial page once even when effects or renders repeat", async () => {
    const { trackPageView } = await import("./application-insights");

    trackPageView("/");
    trackPageView("/");
    trackPageView("/");

    expect(telemetry.loadAppInsights).toHaveBeenCalledTimes(1);
    expect(telemetry.initialize).toHaveBeenCalledWith({
      config: expect.objectContaining({ enableAutoRouteTracking: false }),
    });
    expect(telemetry.trackPageView).toHaveBeenCalledTimes(1);
    expect(telemetry.trackPageView).toHaveBeenCalledWith({
      name: "/",
      uri: "https://example.com/",
    });
  });

  it("counts navigation and returning to a previous page exactly once each", async () => {
    const { trackPageView } = await import("./application-insights");

    for (const path of ["/", "/privacy/", "/privacy/", "/terms/", "/"]) {
      trackPageView(path);
    }

    expect(telemetry.loadAppInsights).toHaveBeenCalledTimes(1);
    expect(telemetry.trackPageView.mock.calls.map(([page]) => page.name)).toEqual([
      "/",
      "/privacy/",
      "/terms/",
      "/",
    ]);
  });

  it.each(["development", "test"])("does not send telemetry in %s", async (mode) => {
    vi.stubEnv("NODE_ENV", mode);
    const { trackPageView } = await import("./application-insights");

    trackPageView("/");

    expect(telemetry.initialize).not.toHaveBeenCalled();
    expect(telemetry.trackPageView).not.toHaveBeenCalled();
  });

  it("does not initialize without a connection string", async () => {
    vi.stubEnv("NEXT_PUBLIC_APPLICATIONINSIGHTS_CONNECTION_STRING", "");
    const { trackPageView } = await import("./application-insights");

    trackPageView("/");

    expect(telemetry.initialize).not.toHaveBeenCalled();
    expect(telemetry.trackPageView).not.toHaveBeenCalled();
  });

  it("does not initialize during server rendering", async () => {
    vi.stubGlobal("window", undefined);
    const { trackPageView } = await import("./application-insights");

    trackPageView("/");

    expect(telemetry.initialize).not.toHaveBeenCalled();
    expect(telemetry.trackPageView).not.toHaveBeenCalled();
  });
});
