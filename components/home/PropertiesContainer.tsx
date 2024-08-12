"use client";
import { fetchPropertiesAction } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";
import ButtonLoader from "../ButtonLoader";
import EmptyList from "./EmptyList";
import PropertiesList from "./PropertiesList";
import { PropertyCardProps } from "@/utils/types";

const PropertiesContainer = ({
  category,
  search,
}: {
  category?: string;
  search?: string;
}) => {
  const categoryProp = category || "";
  const searchProp = search || "";

  const { data, isPending } = useQuery({
    queryKey: ["properties", category, search],
    queryFn: () => fetchPropertiesAction(categoryProp, searchProp),
  });

  if (isPending) return;
  const properties: PropertyCardProps[] = data || [];
  if (properties.length <= 0) {
    return (
      <EmptyList
        heading="No results."
        message="Try changing or removing some of your filters."
        btnText="Clear Filters"
      />
    );
  }

  return <PropertiesList properties={properties} />;
};
export default PropertiesContainer;
