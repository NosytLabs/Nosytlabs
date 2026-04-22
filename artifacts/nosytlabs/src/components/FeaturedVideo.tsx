import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

const URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4";

export default function FeaturedVideo() {
  return (
    <section className="relative bg-black pt-6 md:pt-10 pb-24 md:pb-36 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <Reveal y={60} duration={0.95}>
          <div className="relative rounded-[28px] md:rounded-[36px] overflow-hidden aspect-video liquid-glass">
            <video
              className="w-full h-full object-cover"
              src={URL}
              muted
              autoPlay
              loop
              playsInline
              preload="auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.5)_100%)] pointer-events-none" />

            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-10 flex flex-col md:flex-row md:items-end md:justify-between gap-5">
              <div className="liquid-glass-strong rounded-2xl p-6 md:p-8 max-w-md">
                <div className="text-white/55 text-[11px] tracking-[0.28em] uppercase mb-3">
                  Our Approach
                </div>
                <p className="text-white text-sm md:text-base leading-relaxed">
                  We believe in curiosity-driven exploration. Every project
                  begins with a question, and every answer opens another door
                  worth walking through.
                </p>
              </div>
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="liquid-glass-strong rounded-full px-7 py-3.5 text-white text-sm font-medium inline-flex items-center gap-2 self-start md:self-end"
              >
                Explore the lab
                <ArrowUpRight size={16} />
              </motion.a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
