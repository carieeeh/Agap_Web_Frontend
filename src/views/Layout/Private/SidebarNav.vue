<script setup>
// import { ref } from 'vue'
import { CircleStackIcon, HomeIcon, MapIcon, UserGroupIcon, ArrowLeftEndOnRectangleIcon } from "@heroicons/vue/24/outline";
import { TransitionChild, TransitionRoot } from '@headlessui/vue'
import { RouterLink } from "vue-router";
import { useAuthentication } from '@/stores/authentication'

defineProps({ isOpen: { type: Boolean, default: true } })
defineEmits(['close']);
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
</script>


<template>
  <div class="relative">
    <TransitionRoot :show="isOpen">
      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="fixed inset-y-0 left-0 flex max-w-full">
            <!-- Sidebar component, swap this element with another sidebar if you like -->
            <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="-translate-x-full" enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0"
              leave-to="-translate-x-full">
              <div class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-primaryRed px-6 pt-5 z-50">
                <div class="flex h-24 shrink-0 items-center relative">
                  <img class="h-24" src="/assets/images/white_no_bg_logo.png" alt="" />
                  <button :class="['absolute -top-3 -right-3 text-white lg:hidden']" @click="$emit('close')">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
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
            </TransitionChild>
          </div>
        </div>
      </div>
    </TransitionRoot>
  </div>
</template>