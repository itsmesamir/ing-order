import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { signIn } from 'services/auth';

import useUserStore from 'stores/useUserStore';

import InputField from 'components/InputField';
import Alert from 'components/Alert';

import { parseError } from 'utils/handleError';
import { handleLogin } from 'utils/handleAuth';

import { Any, CustomError } from 'types/common';

import paths from 'constants/paths';

export default function SignIn() {
  const history = useHistory();
  const { updateUser } = useUserStore();

  const [errors, setErrors] = useState<CustomError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const body = Object.fromEntries(formData.entries());

    try {
      setIsSubmitting(true);
      setErrors([]);
      const data = await signIn(body as Any);

      handleLogin(data.tokens);
      updateUser(data.user);

      history.push(paths.home);
    } catch (error) {
      const submitErrors = parseError(error);

      setErrors(submitErrors as CustomError[]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <InputField type="text" label="Email" name="email" required />

          <InputField type="text" label="Password" name="password" required />

          <Alert errors={errors} />

          <div>
            <button
              disabled={isSubmitting}
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {!isSubmitting ? 'Sign In' : 'Submitting'}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?
          <Link
            to={paths.signup}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
