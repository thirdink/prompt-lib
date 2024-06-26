import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const handleMessageShortener = (
	currentMessage: string,
	maxSubString?: number
): string => {
	if (currentMessage == null) return '';
	// create a new string that takes currentMessageContent and just returns the first 52 characters with ... at the end
	if (currentMessage.length > maxSubString! ? maxSubString : 52) {
		const shortMessage = currentMessage.substring(
			0,
			maxSubString ? maxSubString : 52
		);
		return `${shortMessage}...`;
	}
	return currentMessage;
};

export function LibContainer({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				'flex items-center justify-center [&>div]:w-full',
				className
			)}
			{...props}
		/>
	);
}

export const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: 'http://localhost:3000';

export const isPromptLibraryLink = (pathname: string) => {
	return /\/dashboard\/prompt-library(\/.*)?/.test(pathname);
};

export const isChatHistoryLink = (pathname: string) => {
	return /\/dashboard\/chat-history(\/.*)?/.test(pathname);
};
