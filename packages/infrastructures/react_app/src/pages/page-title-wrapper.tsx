import { useEffect } from "react";

interface PageProps {
  title: string;
  children: React.ReactNode;
}

function PageTitleWrapper({ title, children }: PageProps) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return <>{children}</>;
}
export default PageTitleWrapper;
