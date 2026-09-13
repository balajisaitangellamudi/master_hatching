/**
 * Re-export shared auth hooks from packages.
 * Mobile screens can keep importing from this file without changes.
 */
export {
  useLogin,
  useSignUp,
  useCurrentUser,
  useLogout,
  AUTH_KEYS,
} from "../../../../packages/api/mutations/auth.mutations";
