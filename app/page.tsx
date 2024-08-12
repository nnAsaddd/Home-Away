import CategoriesList from "@/components/home/CategoriesList";
import LoadingCards from "@/components/home/LoadingCards";
import PropertiesContainer from "@/components/home/PropertiesContainer";
import { fetchPropertiesAction } from "@/utils/actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";

const HomePage = async ({
  searchParams,
}: {
  searchParams: { category?: string; search?: string };
}) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["properties", "", ""],
    queryFn: () => fetchPropertiesAction("", ""),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section>
        <CategoriesList
          category={searchParams?.category}
          search={searchParams?.search}
        />
        <Suspense fallback={<LoadingCards />}>
          <PropertiesContainer
            category={searchParams?.category}
            search={searchParams?.search}
          />
        </Suspense>
      </section>
    </HydrationBoundary>
  );
};
export default HomePage;
