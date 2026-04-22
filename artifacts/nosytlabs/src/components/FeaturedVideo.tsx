import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

const URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4";

export default function FeaturedVideo() {
  return (
    <section className="relative bg-black pt-6 md:pt-10 pb-24 md:pb-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <Reveal y={50} duration={0.95}>
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-10 flex flex-col md:flex-row md:items-end md:justify-between gap-5">
              <div className="liquid-glass-strong rounded-2xl p-6 md:p-8 max-w-md">
                <div className="text-white/70 text-[11px] tracking-[0.28em] uppercase mb-3">
                  Working in public
                </div>
                <p className="text-white text-[15px] md:text-base leading-relaxed">
                  Every project is built openly on GitHub, walked through on
                  YouTube, and shipped without a marketing department. If
                  it&rsquo;s useful, it goes out. If it isn&rsquo;t, it
                  doesn&rsquo;t.
                </p>
              </div>
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="liquid-glass-strong rounded-full px-7 py-3.5 text-white text-sm font-medium inline-flex items-center gap-2 self-start md:self-end"
              >
                See the repos
                <ArrowUpRight size={16} />
              </motion.a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
