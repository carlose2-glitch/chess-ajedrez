<template>
  <section class="bg-gray-700 min-h-screen flex box-border justify-center items-center">
    <div class="bg-zinc-500 rounded-2xl flex max-w-3xl p-5 items-center">
      <div class="md:w-1/2 px-8">
        <h2 class="font-bold text-3xl text-center text-white">Sign</h2>

        <form @submit.prevent="data" class="flex flex-col gap-4">
          <input
            class="p-2 mt-8 rounded-xl border outline-none"
            v-model="information.user"
            type="text"
            name="user"
            placeholder="Usuario"
            autocomplete="username"
            required
          />
          <input
            class="p-2 rounded-xl border outline-none"
            v-model="information.email"
            type="email"
            name="email"
            placeholder="Email"
            autocomplete="email"
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

          <div class="relative">
            <input
              v-model="information.confir"
              class="p-2 rounded-xl border w-full outline-none"
              :type="eyes ? 'password' : 'text'"
              name="password"
              placeholder="Confirmar password"
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

          <p :class="classLetter">
            <!-- Primera letra mayuscula terminar con caracter especial y min debe tener una longitud de
            8 caracteres -->

            {{ textContent }}
          </p>
          <button
            class="bg-[#002D74] text-white py-2 rounded-xl cursor-pointer hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium"
            type="submit"
          >
            Crear
          </button>
        </form>
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
import type { User } from '../interfaces/createUser/createUser';
import { createUserApi } from '../actions/createUser';
import { useToast } from 'vue-toastification';

const user = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const confirmPas = ref<string>('');

const classLetter = ref<string>('text-transparent');
const textContent = ref<string>('');
const eyes = ref<boolean>(true);

const createUser: User = {
  user: '',
  email: '',
  password: '',
  points: 0,
};

const information = reactive({
  user: user,
  email: email,
  password: password,
  confir: confirmPas,
});

const toast = useToast();
const data = async () => {
  if (
    information.user.trim() !== '' &&
    information.email.trim() !== '' &&
    information.password.trim() !== '' &&
    information.confir.trim() !== ''
  ) {
    /*clave regex: la primera letra debe ser mayuscula seguido de letras y numeros y debe terminar con caracter especial (min 8 y max 16)*/
    const userRegex = /^([A-Z]([a-z0-9]{7,14})[&%#*_.$!+-/\\"\[\]\?\¿!¡])/;
    console.log('aqui');
    if (information.password === information.confir) {
      if (userRegex.test(information.password)) {
        createUser.user = information.user;
        createUser.email = information.email;
        createUser.password = information.password;
        const r = await createUserApi(createUser);

        if (r.r.length > 15) {
          toast.error(r.r);
        } else {
          toast.success(r.r);
          localStorage.setItem('token-chess', r.token);
        }
      } else {
        toast.error(
          'la primera letra debe ser mayuscula seguido de letras y numeros y debe terminar con caracter especial (min 8 y max 16)',
        );
      }
    } else {
      toast.error('confirmacion de la clave debe ser igual');
    }
  }
};
</script>
