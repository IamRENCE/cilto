import { inject } from "@vercel/analytics";
import { injectSpeedInsights } from "@vercel/speed-insights";
import "./style.css";

inject();
injectSpeedInsights();

document.documentElement.classList.add("js");

const reveal = () => {
  document.body.classList.add("is-ready");
};

const withTimeout = <T,>(promise: Promise<T>, ms: number) =>
  Promise.race([
    promise,
    new Promise<void>((resolve) => {
      window.setTimeout(resolve, ms);
    }),
  ]);

if (document.fonts?.ready) {
  void withTimeout(document.fonts.ready, 400).then(reveal).catch(reveal);
} else {
  reveal();
}
