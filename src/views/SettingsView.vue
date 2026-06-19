<script setup lang="ts">
import { ref } from 'vue'
import { api } from '@/api'

const oldPassword = ref('')
const newPassword = ref('')
const message = ref('')
const error = ref('')

async function changePassword() {
  message.value = ''
  error.value = ''
  try {
    await api('/api/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({
        oldPassword: oldPassword.value,
        newPassword: newPassword.value,
      }),
    })
    oldPassword.value = ''
    newPassword.value = ''
    message.value = '密码已修改。'
  } catch (err) {
    error.value = err instanceof Error ? err.message : '修改失败'
  }
}
</script>

<template>
  <section class="workspace">
    <header class="page-header">
      <div>
        <p class="eyebrow">账号设置</p>
        <h1>修改密码</h1>
      </div>
    </header>

    <p v-if="message" class="form-message">{{ message }}</p>
    <p v-if="error" class="form-message danger-message">{{ error }}</p>

    <form class="panel settings-form" @submit.prevent="changePassword">
      <label>
        当前密码
        <input v-model="oldPassword" type="password" autocomplete="current-password" required />
      </label>
      <label>
        新密码
        <input v-model="newPassword" type="password" autocomplete="new-password" required minlength="8" />
      </label>
      <button class="primary-button" type="submit">保存新密码</button>
    </form>
  </section>
</template>

