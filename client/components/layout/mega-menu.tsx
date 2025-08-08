import Link from "next/link";
import React from "react";

type MegaMenuCategory = {
  id: string;
  name: string;
  icon: React.ReactNode;
};

type MegaMenuData = {
  leftCategories: MegaMenuCategory[];
  mainContent: Record<string, string[]>;
};

type Props = {
  megaMenuData: MegaMenuData;
  setShowMegaMenu: (open: boolean) => void;
};

export default function MegaMenu(props: Props) {
  const { megaMenuData, setShowMegaMenu } = props;
  return (
    <div
      className="px-4 py-6 bg-white absolute top-full left-0 right-0 shadow-2xl border-t z-50 hidden md:block"
      onMouseEnter={() => setShowMegaMenu(true)}
      onMouseLeave={() => setShowMegaMenu(false)}
    >
      <div className="grid grid-cols-12 gap-6">
        {/* Left sidebar - Main categories */}
        <div className="col-span-3 lg:col-span-2 border-r pr-4">
          <div className="space-y-1">
            {megaMenuData.leftCategories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                className="flex items-center space-x-3 p-2 rounded hover:bg-red-50 hover:text-red-600 transition-colors group text-sm"
                onClick={() => setShowMegaMenu(false)}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Main content - Product categories */}
        <div className="col-span-6 lg:col-span-7">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {Object.entries(megaMenuData.mainContent)
              .slice(0, 3)
              .map(([title, items]) => (
                <div key={title}>
                  <h4 className="font-semibold text-red-600 mb-3 text-sm">
                    {title}
                  </h4>
                  <div className="space-y-1">
                    {Array.isArray(items) &&
                      items.slice(0, 6).map((item) => (
                        <Link
                          key={item}
                          href={`/products?category=${item
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          className="block text-sm text-gray-600 hover:text-red-600 py-1 hover:underline"
                          onClick={() => setShowMegaMenu(false)}
                        >
                          {item}
                        </Link>
                      ))}
                  </div>
                </div>
              ))}
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mt-6">
            {Object.entries(megaMenuData.mainContent)
              .slice(3, 6)
              .map(([title, items]) => (
                <div key={title}>
                  <h4 className="font-semibold text-red-600 mb-3 text-sm">
                    {title}
                  </h4>
                  <div className="space-y-1">
                    {Array.isArray(items) &&
                      items.slice(0, 6).map((item) => (
                        <Link
                          key={item}
                          href={`/products?category=${item
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          className="block text-sm text-gray-600 hover:text-red-600 py-1 hover:underline"
                          onClick={() => setShowMegaMenu(false)}
                        >
                          {item}
                        </Link>
                      ))}
                  </div>
                </div>
              ))}
          </div>

          {/* Special promotion section */}
          <div className="mt-6 pt-4 border-t">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <h4 className="font-bold text-red-600 mb-1">
                🔥 KM MUA 1 ĐƯỢC 4
              </h4>
              <div className="text-sm text-gray-600 space-y-1">
                <div>Home Office I50177</div>
                <div>Home Office A50175</div>
                <div>Home Office I50168</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar - Promotions */}
        <div className="col-span-3">
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-4 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -mr-10 -mt-10"></div>
              <h4 className="font-bold mb-2">🎮 PC GAMING</h4>
              <p className="text-sm mb-3">VOUCHER ĐẾN 1 TRIỆU</p>
              <div className="bg-yellow-400 text-red-900 px-2 py-1 rounded text-xs font-bold inline-block">
                Giảm 3%
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -mr-10 -mt-10"></div>
              <h4 className="font-bold mb-2">💼 PC VĂN PHÒNG</h4>
              <p className="text-sm mb-3">VOUCHER ĐẾN 500K</p>
              <div className="bg-yellow-400 text-purple-900 px-2 py-1 rounded text-xs font-bold inline-block">
                Giảm 3%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
