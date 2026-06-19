<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { api } from '@/api'
import { formatDateTime } from '@/date'
import type { AuditLog } from '@/types'

const logs = ref<AuditLog[]>([])
const error = ref('')

onMounted(loadLogs)

async function loadLogs() {
  try {
    logs.value = await api<AuditLog[]>('/api/audit-logs')
  } catch (err) {
    error.value = err instanceof Error ? err.message : '加载失败'
  }
}
</script>

<template>
  <section class="workspace">
    <header class="page-header">
      <div>
        <p class="eyebrow">审计日志</p>
        <h1>最近操作记录</h1>
      </div>
      <button class="primary-button" type="button" @click="loadLogs">刷新</button>
    </header>

    <p v-if="error" class="form-message danger-message">{{ error }}</p>

    <div class="panel">
      <div class="audit-head">
        <span>时间</span>
        <span>动作</span>
        <span>目标</span>
        <span>IP</span>
        <span>详情</span>
      </div>
      <div v-for="log in logs" :key="log.id" class="audit-row">
        <span>{{ formatDateTime(log.created_at) }}</span>
        <span>{{ log.action }}</span>
        <span>{{ log.target_type ?? '-' }} / {{ log.target_id ?? '-' }}</span>
        <span>{{ log.ip ?? '-' }}</span>
        <span>{{ log.detail ?? '-' }}</span>
      </div>
      <p v-if="logs.length === 0" class="empty-state">暂无审计日志。</p>
    </div>
  </section>
</template>
