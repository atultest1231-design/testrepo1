 const handleAuthCheck = async () => {
    if (pathname && !publicRoute.includes(pathname)) {
      if (!authData.isAuthenticated) {
        authData.clear();
        router.push("/api/auth/logout");
      } else {
        let allowedRoutesForCurrentUser = publicRoute;
        authData.user?.role?.forEach((role: string) => {
          const r = role as keyof PrivateRoute;
          allowedRoutesForCurrentUser = [
            ...allowedRoutesForCurrentUser,
            ...privateRoute[r],
          ];
        });
        if (!dynamicRoutes.includes("/" + pathname.split("/")[1])) {
          if (!allowedRoutesForCurrentUser.includes(pathname)) {
            router.back();
          }
        }
      }
