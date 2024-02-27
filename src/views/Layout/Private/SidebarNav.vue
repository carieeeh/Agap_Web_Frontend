<script setup>
// import { ref } from 'vue'
import { FireIcon, HomeIcon, MapIcon, UserGroupIcon, ArrowLeftEndOnRectangleIcon } from "@heroicons/vue/24/outline";
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
  { name: "Heatmap", href: "/app/heatmap", icon: FireIcon, current: false },
];

const auth = useAuthentication();
</script>


<template>
  <div>
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
</template>@/stores/authentication