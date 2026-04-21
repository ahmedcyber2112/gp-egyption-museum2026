export default function AuthLoading() {
	return (
		<div className="min-h-screen bg-linear-to-br from-[#A88A5B] to-[#8B7355] flex items-center justify-center p-4">
			<div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 space-y-4">
				<div className="h-10 w-40 rounded-xl bg-gray-200 animate-pulse" />
				<div className="space-y-3">
					<div className="h-10 rounded-lg bg-gray-200 animate-pulse" />
					<div className="h-10 rounded-lg bg-gray-200 animate-pulse" />
					<div className="h-10 rounded-lg bg-gray-200 animate-pulse" />
					<div className="h-10 rounded-lg bg-gray-200 animate-pulse" />
				</div>
				<div className="h-10 rounded-lg bg-[#D4AF37]/80 animate-pulse" />
			</div>
		</div>
	);
}
