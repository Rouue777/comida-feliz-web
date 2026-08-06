type PageContainerProps = {
    children: React.ReactNode;
};

export default function PageContainer({
    children,
}: PageContainerProps) {

    return (

        <main
            className="
                w-full
                max-w-7xl
                mx-auto
                px-4
                sm:px-6
                lg:px-8
                py-6
                space-y-8
            "
        >

            {children}

        </main>

    );

}