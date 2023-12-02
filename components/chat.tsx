'use client';
import React, { useState, useEffect, FormEvent } from 'react';
import { Metadata } from 'next';
import { CounterClockwiseClockIcon } from '@radix-ui/react-icons';
import { useChat } from 'ai/react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

import { CodeViewer } from '@/components/code-viewer';
import { MaxLengthSelector } from '@/components/maxlength-selector';
import { ModelSelector } from '@/components/model-selector';
import { PresetActions } from '@/components/preset-actions';
import { PresetSave } from '@/components/preset-save';
import { PresetSelector } from '@/components/preset-selector';
import { PresetShare } from '@/components/preset-share';
import { TemperatureSelector } from '@/components/temperature-selector';
import { TopPSelector } from '@/components/top-p-selector';
import { models, types } from '@/data/models';
import { presets } from '@/data/presets';
import ChatTab from './ui/chat-tab';
import { Model } from '../data/models';
import PromptTopbar from './PromptTopBar';

export const metadata: Metadata = {
	title: 'Playground',
	description: 'The OpenAI Playground built using the components.',
};

export default function ChatPage() {
	const [temperature, setTemperature] = useState([0.56]);
	const [topP, setTopP] = useState([0.9]);
	const [maxLength, setMaxLength] = useState([256]);
	const [selectedModel, setSelectedModel] = React.useState<Model>(models[0]);
	// const { messages, input, handleInputChange, handleSubmit, error } = useChat(
	// 	{
	// 		sendExtraMessageFields: true,
	// 	}
	// );
	const chatOptions = useChat({ sendExtraMessageFields: true });

	const handleChatOptions = () => {
		console.log('Chat options');
	};

	// const handleChatForm = (e: FormEvent<HTMLFormElement>) => {
	// 	handleSubmit(
	// 		e,
	// 		{},
	// 		{
	// 			body: {
	// 				model,
	// 			},
	// 		}
	// 	);
	// };
	// useEffect(() => {
	// 	chatOptions.append({
	// 		id: 'fsdfasdfsadf',
	// 		temperature: temperature[0],
	// 		top_p: topP[0],
	// 		max_length: maxLength[0],
	// 		selectedModel: selectedModel,
	// 	});
	// 	console.log(chatOptions.data);
	// }, [chatOptions]);

	return (
		<>
			<div className='h-full flex-col flex m-auto p-auto'>
				<div className='flex overflow-x-scroll p-5 hide-scroll-bar'>
					<div className='flex flex-nowrap ml-10 '>
						<PromptTopbar />
					</div>
				</div>
				<Separator />
				<div className='container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16 w-11/12'>
					<h2 className='text-lg font-semibold whitespace-nowrap'>
						Prompt Playground
					</h2>
					<div className='ml-auto flex w-full space-x-2 sm:justify-end'>
						<PresetSelector presets={presets} />
						<PresetSave />
						<div className='hidden space-x-2 md:flex'>
							<CodeViewer />
							<PresetShare />
						</div>
						<PresetActions />
					</div>
				</div>
				<Separator />
				<Tabs defaultValue='edit' className='flex-1'>
					<div className='container h-full py-6 w-10/12'>
						<div className='grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]'>
							<div className='hidden flex-col space-y-4 sm:flex md:order-2'>
								<ChatTab />
								<ModelSelector
									types={types}
									models={models}
									selectedModel={selectedModel}
									setSelectedModel={setSelectedModel}
								/>
								<TemperatureSelector
									defaultValue={temperature}
								/>
								<MaxLengthSelector defaultValue={maxLength} />
								<TopPSelector defaultValue={topP} />
							</div>
							<div className='md:order-1'>
								<TabsContent
									value='edit'
									className='mt-0 border-0 p-0'
								>
									<form onSubmit={chatOptions.handleSubmit}>
										<div className='flex flex-col space-y-4'>
											<div className='grid h-full gap-6 lg:grid-cols-2'>
												<div className='flex flex-col space-y-4'>
													<div className='flex flex-1 flex-col space-y-2'>
														<Label htmlFor='input'>
															Input
														</Label>
														<Textarea
															id='input'
															placeholder='We is going to the market.'
															className='flex-1 lg:min-h-[381px]'
															value={
																chatOptions.input
															}
															onChange={
																chatOptions.handleInputChange
															}
														/>
													</div>
													<div className='flex flex-col space-y-2'>
														<Label htmlFor='instructions'>
															Instructions
														</Label>
														<Textarea
															id='instructions'
															placeholder='Fix the grammar.'
														/>
													</div>
												</div>
												<div className='mt-[21px] min-h-[400px] rounded-md border bg-muted lg:min-h-[500px] max-h-[700px] overflow-auto'>
													{chatOptions.messages.map(
														(message) => (
															<div
																key={message.id}
																className='p-4'
															>
																{message.role ===
																'user'
																	? 'User: '
																	: 'AI: '}
																{
																	message.content
																}
															</div>
														)
													)}
												</div>
											</div>
											<div className='flex items-center space-x-2'>
												<Button type='submit'>
													Submit
												</Button>
												<Button
													variant='secondary'
													disabled
												>
													<span className='sr-only'>
														Show history
													</span>
													<CounterClockwiseClockIcon className='h-4 w-4' />
												</Button>
											</div>
										</div>
									</form>
								</TabsContent>
								<TabsContent
									value='complete'
									className='mt-0 border-0 p-0'
								>
									<div className='flex h-full flex-col space-y-4'>
										<Textarea
											placeholder='Write a tagline for an ice cream shop'
											className='min-h-[400px] flex-1 p-4 md:min-h-[700px] lg:min-h-[500px]'
										/>
										<div className='flex items-center space-x-2'>
											<Button>Submit</Button>
											<Button variant='secondary'>
												<span className='sr-only'>
													Show history
												</span>
												<CounterClockwiseClockIcon className='h-4 w-4' />
											</Button>
										</div>
									</div>
								</TabsContent>
								<TabsContent
									value='insert'
									className='mt-0 border-0 p-0'
								>
									<div className='flex flex-col space-y-4'>
										<div className='grid h-full grid-rows-2 gap-6 lg:grid-cols-2 lg:grid-rows-1'>
											<Textarea
												placeholder="We're writing to [inset]. Congrats from OpenAI!"
												className='h-full min-h-[300px] lg:min-h-[500px] xl:min-h-[500px]'
											/>
											<div className='rounded-md border bg-muted'></div>
										</div>
										<div className='flex items-center space-x-2'>
											<Button type='submit'>
												Submit
											</Button>
											<Button variant='secondary'>
												<span className='sr-only'>
													Show history
												</span>
												<CounterClockwiseClockIcon className='h-4 w-4' />
											</Button>
										</div>
									</div>
								</TabsContent>
							</div>
						</div>
					</div>
				</Tabs>
			</div>
		</>
	);
}
