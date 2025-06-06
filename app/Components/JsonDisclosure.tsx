import {
  Disclosure as HeadlessDisclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

export default function JsonDisclosure({ json }: { json: any }) {
  const disclosureItems = Object.entries(json).map(([key, value]) => ({
    title: key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    content: value,
  }));
  return (
    <div className=" text-black font-extralight text-sm w-full px-4 pt-2">
      <div className="mx-auto w-full divide-y rounded-xl bg-white/10">
        {disclosureItems.map((item: any, index: number) => (
          <HeadlessDisclosure
            as="div"
            className="p-6"
            key={index}
            defaultOpen={item.defaultOpen}
          >
            <DisclosureButton className="group flex w-full items-center justify-between">
              <span className="text-sm font-light uppercase ">
                {item.title}
              </span>
              <ChevronDownIcon className="size-5 fill-black/60 group-hover:fill-black/50 group-data-open:rotate-180 group-open:rotate-180 transition-transform duration-500" />
            </DisclosureButton>
            <DisclosurePanel className="mt-2 text-xs text-black ">
              {item.content}
            </DisclosurePanel>
          </HeadlessDisclosure>
        ))}
      </div>
    </div>
  );
}
