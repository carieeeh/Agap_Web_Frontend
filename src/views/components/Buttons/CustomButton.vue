<script setup>
import { PencilSquareIcon, NoSymbolIcon, CheckCircleIcon, DocumentPlusIcon, TrashIcon, ArrowDownTrayIcon, ArrowPathIcon, Bars3CenterLeftIcon } from '@heroicons/vue/24/outline';

const props = defineProps({
    isLoading: {
        type: Boolean,
        default: false
    },
    label: {
        type: String,
        default: 'label'
    },
    type: {
        type: String,
    }
});

const getIconType = () => {
    const iconComponentMap = {
        'accept': CheckCircleIcon,
        'cancel': NoSymbolIcon,
        'edit': PencilSquareIcon,
        'import': ArrowDownTrayIcon,
        'clear': TrashIcon,
        'upload': DocumentPlusIcon,
    };

    return iconComponentMap[props.type] || Bars3CenterLeftIcon;
}

const getLabelType = () => {
    const genericLabelMap = {
        'accept' : "Accept",
        'cancel' : "Cancel",
        'edit' : "Edit",
        'import' : "Import",
        'clear' : "Clear",
        'upload' : "Upload",
    };

    return genericLabelMap[props.type] || props.label;
}
</script>

<template>
    <button type="button" class="rounded-md shadow-md px-3 py-1.5 text-sm hover:bg-opacity-80" :disabled="isLoading">
        <div v-if="isLoading" class="flex items-center gap-2">
            <ArrowPathIcon class="animate-spin h-5 w-5 shrink-0" />
            <span class="animate-pulse">Processing...</span>
        </div>
        <div v-else class="flex items-center gap-2">
            <slot>
                <component :is="getIconType()" class="h-5 w-5 shrink-0" /> {{ getLabelType() }}
            </slot>
        </div>
    </button>
</template>
