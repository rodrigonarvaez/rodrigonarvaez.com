import Lenis from "@studio-freight/lenis";

export interface LenisConfig {
  development?: boolean;
}

export default function (props: LenisConfig = {}) {
  const lenis = new Lenis();

  if (props.development) {
    lenis.on("scroll", (e: any) => {
      console.log(e);
    });
  }

  function raf(time: any) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}
