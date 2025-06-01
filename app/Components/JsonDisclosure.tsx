import {
  Disclosure as HeadlessDisclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

export default function JsonDisclosure({ json }: { json: any }) {
  return (
    <div className="h-screen text-black font-thin text-sm w-screen px-4 pt-2">
      <div className="mx-auto w-full divide-y rounded-xl bg-black/10">
        {json.map((item: any, index: number) => (
          <HeadlessDisclosure
            as="div"
            className="p-6"
            key={index}
            defaultOpen={item.defaultOpen}
          >
            <DisclosureButton className="group flex w-full items-center justify-between">
              <span className="text-sm font-medium ">
                {item.title}
              </span>
              <ChevronDownIcon className="size-5 fill-black/60 group-hover:fill-black/50 group-open:rotate-180 transition-transform duration-300" />
            </DisclosureButton>
            <DisclosurePanel className="mt-2 text-sm ">
              {item.content}
            </DisclosurePanel>
          </HeadlessDisclosure>
        ))}
      </div>
    </div>
  );
}
