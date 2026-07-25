import { ERROR_MESSAGES } from '../constants/errors';

type Props = {
  message: string;
};

export function FormError({ message }: Props) {
  return <p className="text-red-600">{ERROR_MESSAGES[message] ?? message}</p>;
}
