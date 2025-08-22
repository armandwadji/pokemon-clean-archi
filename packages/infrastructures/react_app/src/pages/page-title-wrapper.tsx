import {useEffect} from "react";

type PageProps = {
    title: string;
    children: React.ReactNode;
};

function PageTitleWrapper({ title, children }: PageProps) {
    useEffect(() => {
        document.title = title;
    }, [title]);

    return <>{children}</>;
}
export default PageTitleWrapper;
