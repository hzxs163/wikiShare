<script setup lang="ts">
import { ClipboardList, FileText, LogOut, Recycle, Settings, Users } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'

const auth = useAuthStore()
const router = useRouter()

async function logout() {
  await auth.logout()
  await router.push('/login')
}
</script>

<template>
  <div class="app-shell">
    <aside v-if="auth.user" class="sidebar">
      <div class="brand">
        <div class="brand-mark">CF</div>
        <div>
          <strong>CFShare</strong>
          <span>PDF 在线阅读</span>
        </div>
      </div>

      <nav class="nav-list">
        <RouterLink to="/" class="nav-item">
          <FileText :size="18" />
          浏览
        </RouterLink>
        <RouterLink v-if="auth.user.role === 'admin'" to="/manage" class="nav-item">
          <FileText :size="18" />
          管理
        </RouterLink>
        <RouterLink v-if="auth.user.role === 'admin'" to="/trash" class="nav-item">
          <Recycle :size="18" />
          回收站
        </RouterLink>
        <RouterLink v-if="auth.user.role === 'admin'" to="/users" class="nav-item">
          <Users :size="18" />
          用户
        </RouterLink>
        <RouterLink v-if="auth.user.role === 'admin'" to="/audit-logs" class="nav-item">
          <ClipboardList :size="18" />
          审计
        </RouterLink>
        <RouterLink to="/settings" class="nav-item">
          <Settings :size="18" />
          设置
        </RouterLink>
      </nav>

      <div class="sidebar-footer">
        <div>
          <strong>{{ auth.user.username }}</strong>
          <span>{{ auth.user.role === 'admin' ? '管理员' : '用户' }}</span>
        </div>
        <button class="icon-button" title="退出登录" @click="logout">
          <LogOut :size="18" />
        </button>
      </div>
    </aside>

    <main class="main-panel">
      <RouterView />
    </main>
  </div>
</template>
