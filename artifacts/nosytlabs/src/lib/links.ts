export const LINKS = {
  github: "https://github.com/NosytLabs",
  youtube: "https://www.youtube.com/channel/UC_tgfMnIcskFOjY3bX9T2QQ",
  x: "https://x.com/NosytLabs",
  spotify: "https://open.spotify.com/artist/6PgkavAN36A3ngqiqOollE",
  spotifyEmbed:
    "https://open.spotify.com/embed/artist/6PgkavAN36A3ngqiqOollE?utm_source=generator&theme=0",
  email: "mailto:hi@nosytlabs.com",
  emailRaw: "hi@nosytlabs.com",
  // formsubmit.co — free, no signup. POST captures the email and forwards
  // to hi@nosytlabs.com (Spacemail). First submission triggers a one-time
  // confirmation email that the owner must click before forwarding starts.
  formEndpoint: "https://formsubmit.co/ajax/hi@nosytlabs.com",
  subscribe: (email: string) =>
    `mailto:hi@nosytlabs.com?subject=${encodeURIComponent(
      "[Nosytlabs] Subscribe to build notes",
    )}&body=${encodeURIComponent(
      `Hi,\n\nPlease add me to the Nosytlabs build notes list.\n\nEmail: ${email}\n\nThanks!`,
    )}`,
} as const;
