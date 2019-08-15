<template>
  <section class="wrapper">
    <app-notification :status="status" :type="type" :text="message"/>
    <header>
      <app-text tag-name="h1" class="medium">Public Page</app-text>
	  <nuxt-link to="/admin/dashboard">Admin</nuxt-link>
    </header>
    <nav>
      <ul class="list-container">
        <li class="list-item">
          <nuxt-link to="/">Sign Up</nuxt-link>
        </li>
        <li class="list-item">
          <nuxt-link to="/sign-in">Sign In</nuxt-link>
        </li>
        <li class="list-item">
          <nuxt-link to="/recover-account">Recover Account</nuxt-link>
        </li>
      </ul>
    </nav>
    <nuxt-child/>
  </section>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import appNotification from '@/components/app-notification.vue';
import appText from '@/components/app-text.vue';

export default {
	name: 'layouts-default',
	components: {
		appNotification,
		appText,
	},
	computed: {
		...mapState({
			message: state => state.notifications.message,
			type: state => state.notifications.type,
		}),
		...mapGetters({
			status: 'notifications/status',
		}),
	},
};
</script>

<style scoped>
.list-container {
	align-items: center;
	display: flex;
	flex-direction: column;
	list-style-type: none;
	padding: var(--largePadding) 0;
}

.list-item {
	padding: var(--smallPadding) 0;
}

.wrapper {
	padding: var(--largePadding);
}
</style>