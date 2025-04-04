<template>
  <section class="bg-gray-700 min-h-screen flex box-border justify-center items-center">
    <div class="bg-zinc-500 rounded-2xl flex max-w-3xl p-5 items-center">
      <div class="md:w-1/2 px-8">
        <h2 class="font-bold text-3xl text-center text-white">Login</h2>

        <form @submit.prevent="data" class="flex flex-col gap-4">
          <input
            class="p-2 mt-8 rounded-xl border outline-none"
            v-model="information.email"
            type="email"
            name="email"
            placeholder="Email"
            autocomplete="username"
            required
          />
          <div class="relative">
            <input
              v-model="information.password"
              class="p-2 rounded-xl border w-full outline-none"
              :type="eyes ? 'password' : 'text'"
              name="password"
              placeholder="Password"
              autocomplete="current-password"
              required
            />
            <svg
              @click="eyes = !eyes"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="black"
              id="togglePassword"
              class="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer z-20 opacity-100"
              viewBox="0 0 16 16"
            >
              <path
                d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
              ></path>
              <path
                d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
              ></path>
            </svg>
          </div>
          <button
            class="bg-[#002D74] flex justify-center text-white py-2 rounded-xl cursor-pointer hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium"
            type="submit"
          >
            <svg
              v-if="charger"
              class="mr-3 border-r-black size-5 animate-spin border-4 rounded-[50%]"
              viewBox="0 0 24 24"
            ></svg>
            <p v-else>Login</p>
          </button>
        </form>

        <a href="#" class="mt-10 text-sm border-gray-500 hover:text-blue-200 py-5"
          >Olvido la contraseña</a
        >

        <div class="mt-4 text-sm flex justify-between items-center container-mr">
          <p class="mr-3 md:mr-0">no tienes cuenta aun??</p>
          <RouterLink
            to="/auth/sing"
            class="hover:border register cursor-pointer text-white bg-[#002D74] hover:border-gray-400 rounded-xl py-2 px-5 hover:scale-110 hover:bg-[#002c7424] font-semibold duration-300"
          >
            Registrar
          </RouterLink>
        </div>
      </div>
      <div class="md:block hidden w-1/2">
        <img
          class="rounded-2xl w-80"
          src="https://i.pinimg.com/736x/d8/26/96/d826964fbc2fa7a9bab06a5e2bcb5608.jpg"
          alt="login form image"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { loginUser } from '../actions/login';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const email = ref<string>('');
const password = ref<string>('');

const eyes = ref<boolean>(true);
const router = useRouter();

const toast = useToast();

const charger = ref<boolean>(false);

const information = reactive({
  email: email,
  password: password,
});

const data = async () => {
  const r = await loginUser({ email: information.email, password: information.password });

  if (r.data === 'Ok') {
    charger.value = true;
    toast.success(r.data);
    localStorage.setItem('token-chess', r.r);
    return router.replace({ path: '/' });
  }

  return toast.error(r.data);
};
</script>
