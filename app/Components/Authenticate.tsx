import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
  Field,
  Input,
  Label,
} from '@headlessui/react';
import clsx from 'clsx';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import supabase from 'utils/supabase';
interface AuthenticateProps {
  isOpen: boolean;
  onClose: () => void;
  setIsAuthenticated?: (isAuth: boolean) => void;
}

export default function Authenticate({ isOpen, onClose, setIsAuthenticated }: AuthenticateProps) {
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    
    
const handleAuth = async () => {
  setLoading(true);
  setErrorMsg('');

  if (isRegister) {
    // Password validation
    const passwordRegex = /^[A-Z][A-Za-z\d!@#$%^&*()_+[\]{};':"\\|,.<>/?`~\-]{7,}$/;
    const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

    if (!passwordRegex.test(password) || !specialCharRegex.test(password)) {
      setErrorMsg(
        'Mật khẩu phải có ít nhất 8 ký tự, bắt đầu bằng chữ cái in hoa và chứa 1 ký tự đặc biệt.'
      );
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Mật khẩu xác nhận không khớp.');
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: phone,
        },
      },
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      onClose();
      navigate('/emailConfirmationWaiting');
      setIsAuthenticated?.(true);
    }
  } else {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      onClose();
      setIsAuthenticated?.(true);
    }
  }

  setLoading(false);
};


  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-20 focus:outline-none"
      onClose={onClose}
    >
      <div className="fixed inset-0 z-20 w-screen backdrop-blur-lg overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 pr-8">
          <DialogPanel
            transition
            className="text-center w-full max-w-md rounded-xl mt-10 p-6 bg-black/30 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            <DialogTitle
              as="h3"
              className="text-base/7 font-medium text-white"
            >
              {isRegister ? 'Đăng ký' : 'Đăng nhập'}
            </DialogTitle>

            <p className="mt-2 text-sm/6 text-white/50">
              {isRegister
                ? 'Tạo tài khoản mới để sử dụng GapZ.'
                : 'Hãy nhập email và mật khẩu của bạn để đăng nhập vào tài khoản GapZ.'}
            </p>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleAuth();
                }}
                className="mt-2 space-y-1 text-left"
                >
                {isRegister && (
                    <>
                    <Field>
                        <Label className="text-sm font-medium text-white">Họ và tên</Label>
                        <Input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className={clsx(
                            'mt-1 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm text-white',
                            'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
                        )}
                        />
                    </Field>

                    <Field>
                        <Label className="text-sm font-medium text-white">Số điện thoại</Label>
                        <Input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className={clsx(
                            'mt-1 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm text-white',
                            'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
                        )}
                        />
                    </Field>
                    </>
                )}

                <Field>
                    <Label className="text-sm font-medium text-white">Email</Label>
                    <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={clsx(
                        'mt-1 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm text-white',
                        'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
                    )}
                    />
                </Field>

                <Field>
                    <Label className="text-sm font-medium text-white">Mật khẩu</Label>
                    <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={clsx(
                        'mt-1 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm text-white',
                        'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
                    )}
                    />
                </Field>

                {isRegister && (
                    <Field>
                    <Label className="text-sm font-medium text-white">Xác nhận mật khẩu</Label>
                    <Input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className={clsx(
                        'mt-1 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm text-white',
                        'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
                        )}
                    />
                    </Field>
                )}

                {errorMsg && <p className="text-sm text-red-400 mt-1">{errorMsg}</p>}

                <div className="pt-2">
                    <Button
                    type="submit"
                    disabled={loading}
                    className={clsx(
                        'inline-flex items-center justify-center gap-2 rounded-md px-3 py-1.5 text-sm font-semibold text-white shadow-inner shadow-white/10',
                        'focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white',
                        'bg-gray-700 hover:bg-gray-600 disabled:opacity-50'
                    )}
                    >
                    {loading
                        ? isRegister
                        ? 'Đang đăng ký...'
                        : 'Đang đăng nhập...'
                        : isRegister
                        ? 'Đăng ký'
                        : 'Đăng nhập'}
                    </Button>
                </div>
                </form>


            <p className="mt-4 text-sm/6 text-white/50">
              {isRegister ? 'Đã có tài khoản?' : 'Bạn chưa có tài khoản?'}{' '}
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="text-white underline"
              >
                {isRegister ? 'Đăng nhập' : 'Đăng ký tài khoản'}
              </button>
            </p>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
