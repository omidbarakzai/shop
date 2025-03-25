import Search from "@/common/Search";
import ProductsFilter from "./ProductsFilter";
import ProductsSort from "./ProductsSort";

function CategorySidebar({ categories }) {
  return (
    <div className="space-y-4">
      <Search />
      <ProductsFilter categories={categories} />
      <ProductsSort />
    </div>
  );
}
export default CategorySidebar;
