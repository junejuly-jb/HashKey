<script>
export default {
    props: ['note_info', 'infoDialogStat']
}
</script>
<template>
    <div>
        <div class="my-2">
            <h3>{{note_info.note_title}}</h3>
        </div>
        <div class="my-2">
            <p>{{note_info.note_content}}</p>
        </div>
    </div>
</template>