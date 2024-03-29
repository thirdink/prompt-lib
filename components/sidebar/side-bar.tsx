'use client';
import { useState, useEffect } from 'react';
import { ResizablePanel } from '@/components/ui/resizable';
import { cn } from '@/lib/utils';
import { Nav } from '@/components/sidebar/nav';
import { sidebarNavItems } from '@/data/nav-bar';
import { SidebarNavProps } from '@/lib/types/sidebar/side-bar';

export function SidebarNav({
	className,
	defaultCollapsed,
	navCollapsedSize,
	defaultLayout,
}: SidebarNavProps) {
	const [items, setItems] = useState(sidebarNavItems);
	const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
	// useEffect(()=>{
	// 	console.log('defaultLayout Sidebar: ', defaultLayout);
	// })
	return (
		<ResizablePanel
			defaultSize={defaultLayout}
			collapsedSize={navCollapsedSize}
			collapsible={true}
			minSize={15}
			maxSize={20}
			onCollapse={() => {
				setIsCollapsed(true);
				document.cookie = 'react-resizable-panels:collapsed=true';
			}}
			onExpand={() => {
				setIsCollapsed(false);
				document.cookie = 'react-resizable-panels:collapsed=false';
			}}
			className={cn(
				isCollapsed &&
					'min-w-[50px] transition-all duration-300 ease-in-out'
			)}
		>
			<Nav isCollapsed={isCollapsed!} links={items} />
		</ResizablePanel>
	);
}
