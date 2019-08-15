<template>
  <section>
    <header>
      <app-text tag-name="h2" class="medium">Hello {{ user.email }}</app-text>		
      <app-text tag-name="h2" class="medium">Change Your Password</app-text>
    </header>
    <section>
      <form @submit.prevent="submit">
        <app-input type="password" id="password" v-model="password" label="New Password"/>
        <app-btn :disabled="disabledButton" type="submit" text="Change Password"/>
      </form>
    </section>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import appBtn from '@/components/app-btn.vue';
import appInput from '@/components/app-input.vue';
import appText from '@/components/app-text.vue';

function data() {
	return {
		message: '',
		password: '',
		status: 'idle',
	};
}

function disabledButton() {
	return this.status === 'loading';
}

async function submit() {
	this.status = 'loading';
	try {
		const user = await this.$identity.currentUser();
		await user.update({ password: this.password });
		this.show({ message: 'Password Updated! 👍🏼', type: 'success' });
		this.status = 'finished';
	} catch (error) {
		this.show({ message: `${error.json.msg} 🚫` });
		this.status = 'error';
	}
}

export default {
	name: 'pages-admin-change-password',
	components: {
		appBtn,
		appInput,
		appText,
	},
	computed: {
		disabledButton,
	},
	data,
	layout: 'admin',
	methods: {
		submit,
		...mapActions({
			show: 'notifications/show',
		}),
	},
};
</script>
