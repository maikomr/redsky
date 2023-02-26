import createCache from "@emotion/cache";

/*
 Ensures that Emotion’s default settings will be replaced with our custom styles 
 and that this information will be configured both on the client and server sides.
*/
export default function createEmotionCache() {
  return createCache({
    key: "css",
    prepend: true, // this makes our custom styles load first
  });
}
