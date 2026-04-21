export default function PageLoading() {
	return (
		<div className="min-h-screen bg-[#050505] text-white pt-24 px-4 md:px-8">
			<div className="max-w-6xl mx-auto space-y-8">
				<div className="h-12 w-72 rounded-2xl bg-white/5 animate-pulse" />
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="h-72 rounded-3xl bg-white/5 animate-pulse" />
					<div className="h-72 rounded-3xl bg-white/5 animate-pulse" />
				</div>
				<div className="h-96 rounded-3xl bg-white/5 animate-pulse" />
			</div>
		</div>
	);
}
