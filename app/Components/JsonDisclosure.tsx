import {
  Disclosure as HeadlessDisclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

export default function JsonDisclosure({ json }: { json: any }) {
  // Define the desired order of titles
  const customOrder = [
    "Description",
    "Design For",
    "Fabric"
  ];

  // Transform keys to readable format
  const disclosureItems = Object.entries(json).map(([key, value]) => ({
    title: key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    content: value,
  }));

  // Sort items based on the custom order
  const sortedItems = disclosureItems.sort((a, b) => {
    const indexA = customOrder.findIndex(title => a.title.toLowerCase().includes(title.toLowerCase()));
    const indexB = customOrder.findIndex(title => b.title.toLowerCase().includes(title.toLowerCase()));
    return indexA - indexB;
  });

  return (
    <div className="text-black font-extralight text-sm  w-full px-4 pt-2">
      <div className=" w-full divide-y rounded-xl  bg-white/10">
        {sortedItems.map((item: any, index: number) => (
          <HeadlessDisclosure
            as="div"
            className="w-full col-span-full p-6"
            key={index}
            defaultOpen={item.defaultOpen}
          >
            <DisclosureButton className="group flex lg:px-3 min-w-full  lg:min-w-lg w-full items-center justify-between">
              <span className="text-sm font-light uppercase">
                {item.title}
              </span>
              <ChevronDownIcon className="size-5 fill-black/60 group-hover:fill-black/50 group-data-open:rotate-180 group-open:rotate-180 transition-transform duration-500" />
            </DisclosureButton>
            <DisclosurePanel className="mt-2  text-left text-xs text-black">
              {item.content}
            </DisclosurePanel>
          </HeadlessDisclosure>
        ))}
      </div>
    </div>
  );
}
