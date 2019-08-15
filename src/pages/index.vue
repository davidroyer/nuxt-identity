<template>
	<div>
	<app-sign-form
		@submit="submit"
		title="Sign Up"
		button-text="Sign Up"
		:button-status="disabledButton"
		:message="message"
	/>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
import appSignForm from '@/components/app-sign-form.vue';

const actions = {
  '#recovery_token': {
    message: 'Account was recovered!',
    method: 'recover',
    route: '/admin/change-password',
    saveToken: true,
  },
  '#confirmation_token': {
    message: 'Account was confirmed!',
    method: 'confirm',
    route: '/sign-in',
  },
};

function data () {
  return {
    message: '',
    status: 'idle',
  };
}

async function mounted () {
  if (process.client) {
    const { hash } = window.location;
    if (hash) {
      this.status = 'loading';
      this.show({
        message: 'Verifying Account, please wait... 😅',
        type: 'warning',
      });
      const token = hash.split('=');
      if (token.length === 2) {
        const [actionName, tokenValue] = token;
        const action = actions[actionName];
        await this.$identity[action.method](tokenValue, true);
        this.$router.push(action.route);
      }
    }
  }

}

function disabledButton () {
  return this.status === 'loading';
}

async function submit ({ username, password }) {
  this.status = 'loading';
  try {
    await this.$identity.signup(username, password);
    this.show({
      message: 'Please check your email and confirm your account ✅',
      type: 'success',
    });
  } catch (error) {
    this.show({ message: `${error.json.msg} 🚫` });
    this.status = 'error';
  }
}

export default {
  name: 'pages-home',
  mounted,
  components: {
    appSignForm,
  },
  computed: {
    disabledButton,
  },
  data,
  methods: {
    submit,
    ...mapActions({
      show: 'notifications/show',
    }),
  },
};
</script>
