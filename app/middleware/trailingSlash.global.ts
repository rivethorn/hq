export default defineNuxtRouteMiddleware((to) => {
  // ignore root and anything that's just "/"
  if (to.path === "/" || to.path === "") return;

  // if it ends with "/" and isn't just "/"
  if (to.path.endsWith("/")) {
    const newPath = to.path.slice(0, -1) || "/";
    return navigateTo(
      { path: newPath, query: to.query, hash: to.hash },
      { redirectCode: 301 } // permanent redirect
    );
  }
});
