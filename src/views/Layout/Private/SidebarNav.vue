<script setup>
import { ref } from 'vue'
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { CircleStackIcon, HomeIcon, MapIcon, UserGroupIcon, ArrowLeftEndOnRectangleIcon, Bars3Icon } from "@heroicons/vue/24/outline";
import { RouterLink } from "vue-router";
import { useAuthentication } from '@/stores/authentication'

const navigation = [
  { name: "Dashboard", href: "/app/dashboard", icon: HomeIcon, current: true },
  {
    name: "Accounts",
    href: "/app/accounts",
    icon: UserGroupIcon,
    current: false,
  },
  {
    name: "Interactive Map",
    href: "/app/interactive-map",
    icon: MapIcon,
    current: false,
  },
  { name: "Heatmap", href: "/app/heatmap", icon: CircleStackIcon, current: false },
];
const auth = useAuthentication();
const sidebarOpen = ref(false);
</script>


<template>
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog as="div" class="relative z-50 lg:hidden" @close="sidebarOpen = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
          enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
          leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-900/80" />
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full" enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
            leave-to="-translate-x-full">
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0"
                enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <!-- Sidebar component, swap this element with another sidebar if you like -->
              <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-primaryRed pt-5 px-6 pb-4">
                <div class="flex h-24 ml-5 shrink-0 items-center">
                  <img class="h-24" src="/assets/images/white_no_bg_logo.png" alt="" />
                </div>
                <nav class="flex flex-1 flex-col">
                  <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" class="-mx-2 space-y-1">
                        <li v-for="item in navigation" :key="item.name">
                          <RouterLink :to="item.href" :class="[
                            $route.path == item.href || $route.path.includes(item.href)
                              ? 'bg-gray-50 text-primaryRed'
                              : 'text-white hover:text-primaryRed hover:bg-gray-50',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                          ]">
                            <component :is="item.icon" :class="[
                              $route.path == item.href || $route.path.includes(item.href)
                                ? 'text-primaryRed'
                                : 'text-white group-hover:text-primaryRed',
                              'h-6 w-6 shrink-0',
                            ]" aria-hidden="true" />
                            {{ item.name }}
                          </RouterLink>
                        </li>
                      </ul>
                    </li>
                    <li class="-mx-3 mt-auto mb-2">
                      <button @click="auth.logout()" :class="[
                        'text-white hover:text-primaryRed hover:bg-gray-50',
                        'group w-full flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                      ]">
                        <ArrowLeftEndOnRectangleIcon :class="[
                          'text-white group-hover:text-primaryRed',
                          'h-6 w-6 shrink-0',
                        ]" aria-hidden="true" />
                        Logout
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <button type="button" class="ml-2.5 mt-2.5 text-gray-700 lg:hidden" @click="sidebarOpen = true">
      <span class="sr-only">Open sidebar</span>
      <Bars3Icon class="h-6 w-6" aria-hidden="true" />
    </button>

    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-primaryRed px-6 pt-5">
        <div class="flex h-24 shrink-0 items-center">
          <img class="h-24" src="/assets/images/white_no_bg_logo.png" alt="" />
        </div>
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" class="-mx-2 space-y-1">
                <li v-for="item in navigation" :key="item.name">
                  <RouterLink :to="item.href" :class="[
                    $route.path == item.href || $route.path.includes(item.href)
                      ? 'bg-gray-50 text-primaryRed'
                      : 'text-white hover:text-primaryRed hover:bg-gray-50',
                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                  ]">
                    <component :is="item.icon" :class="[
                      $route.path == item.href || $route.path.includes(item.href)
                        ? 'text-primaryRed'
                        : 'text-white group-hover:text-primaryRed',
                      'h-6 w-6 shrink-0',
                    ]" aria-hidden="true" />
                    {{ item.name }}
                  </RouterLink>
                </li>
              </ul>
            </li>
            <li class="-mx-3 mt-auto mb-2">
              <button @click="auth.logout()" :class="[
                'text-white hover:text-primaryRed hover:bg-gray-50',
                'group w-full flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
              ]">
                <ArrowLeftEndOnRectangleIcon :class="[
                  'text-white group-hover:text-primaryRed',
                  'h-6 w-6 shrink-0',
                ]" aria-hidden="true" />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>