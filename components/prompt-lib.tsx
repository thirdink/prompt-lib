'use client';
import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { LibContainer } from '@/lib/utils';
import { promptSchema } from '@/lib/types/prompt/prompt-lib';
import { promptService } from '@/service/client/prompt-service';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import { Textarea } from '@/components/ui/textarea';

const promptFormSchema = promptSchema.promptFormSchema;

const categoriesSchemaArray = promptSchema.categoriesSchemaArray;

const PromptLib = () => {
	const [categories, setCategories] = useState<
		z.infer<typeof categoriesSchemaArray>
	>([]);
	const form = useForm<z.infer<typeof promptFormSchema>>({
		resolver: zodResolver(promptFormSchema),
		defaultValues: {
			title: '',
			input: '',
			instructions: '',
			categories: '',
		},
	});

	const handlePromptSubmit = async (
		values: z.infer<typeof promptFormSchema>
	) => {
		// post request to 'api/prompt'
		const postPrompt = await promptService.postPrompt(values);
	};

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof promptFormSchema>) {
		// create an api call to create a prompt at api/prompt
		handlePromptSubmit(values);
	}

	const getCategories = async () => {
		const getPromptCategories = await promptService.getPromptCategories();
		setCategories(getPromptCategories.promptCategories);
	};

	const getPrompts = async () => {
		const getPrompt = await promptService.getAllPrompts();
		// const allUserPrompts = await getPrompt?.json();
		console.log('getPrompt', getPrompt);
	};

	useEffect(() => {
		getCategories();
		getPrompts();
	}, []);

	const handleCreatePrompt = () => {};
	return (
		<>
			<div className='flex items-center space-x-2 justify-end p-10'>
				<Dialog>
					<DialogTrigger asChild>
						<Button variant='secondary'>Create</Button>
					</DialogTrigger>
					<DialogContent className='sm:max-w-[625px]'>
						<DialogHeader>
							<DialogTitle>Create Prompt</DialogTitle>
							<DialogDescription>
								you can paste your prompt here
							</DialogDescription>
						</DialogHeader>
						<div className='grid gap-4'>
							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className='space-y-8'
								>
									<FormField
										control={form.control}
										name='title'
										render={({ field }) => (
											<FormItem>
												<FormLabel>Title</FormLabel>
												<FormControl>
													<Input
														placeholder='Enter the title for the prompt here.'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='categories'
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Categories
												</FormLabel>
												<Select
													onValueChange={
														field.onChange
													}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger className='w-[180px]'>
															<SelectValue placeholder='select a category' />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{categories.map(
															(category) => (
																<SelectItem
																	key={
																		category.id
																	}
																	value={
																		category.id
																	}
																>
																	{
																		category.name
																	}
																</SelectItem>
															)
														)}
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='input'
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Prompt Input
												</FormLabel>
												<FormControl>
													<Textarea
														placeholder='Create a paragraph on samurai in Japan in the 1800s.'
														className='flex-1 lg:min-h-[381px]'
														{...field}
													/>
												</FormControl>
												<FormDescription>
													Provide the prompt input
													here.
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='instructions'
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Instructions
												</FormLabel>
												<FormControl>
													<Input
														placeholder='Enter instructions for the prompt here.'
														{...field}
													/>
												</FormControl>
												<FormDescription>
													Provide additional
													instructions or guidelines
													for the prompt.
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<Button type='submit'>Save</Button>
								</form>
							</Form>
						</div>
					</DialogContent>
				</Dialog>
			</div>
			<div className='items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3'>
				<div className='col-span-2 grid items-start gap-6 lg:col-span-1'>
					<LibContainer>
						<div>prompt-lib 1</div>
					</LibContainer>
				</div>
				<div className='col-span-2 grid items-start gap-6 lg:col-span-1'>
					<LibContainer>
						<div>prompt-lib 2</div>
					</LibContainer>
				</div>
				<div className='col-span-2 grid items-start gap-6 lg:col-span-1'>
					<LibContainer>
						<div>prompt-lib 3</div>
					</LibContainer>
				</div>
				<div className='col-span-2 grid items-start gap-6 lg:col-span-1'>
					<LibContainer>
						<div>prompt-lib 4</div>
					</LibContainer>
				</div>
				<div className='col-span-2 grid items-start gap-6 lg:col-span-1'>
					<LibContainer>
						<div>prompt-lib 5</div>
					</LibContainer>
				</div>
				<div className='col-span-2 grid items-start gap-6 lg:col-span-1'>
					<LibContainer>
						<div>prompt-lib 6</div>
					</LibContainer>
				</div>
			</div>
		</>
	);
};

export default PromptLib;
