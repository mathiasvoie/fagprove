export class ToolCard {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string | null,
    public readonly imageId: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  render() {
    return (
      <article
        key={this.id}
        className="group relative bg-gray-50 gap-5 w-full flex flex-col rounded-xl p-4 transition-all cursor-pointer duration-300"
      >
        <div className="w-full h-[175px] rounded-xl items-center justify-center flex">
          <svg
            width={100}
            height={100}
            viewBox="0 0 512 512"
            className="fill-gray-300"
          >
            <path d="M64 64C46.3 64 32 78.3 32 96l0 233.4 67.7-67.7c15.6-15.6 40.9-15.6 56.6 0L224 329.4 355.7 197.7c15.6-15.6 40.9-15.6 56.6 0L480 265.4 480 96c0-17.7-14.3-32-32-32L64 64zM32 374.6L32 416c0 17.7 14.3 32 32 32l41.4 0 96-96-67.7-67.7c-3.1-3.1-8.2-3.1-11.3 0L32 374.6zM389.7 220.3c-3.1-3.1-8.2-3.1-11.3 0L150.6 448 448 448c17.7 0 32-14.3 32-32l0-105.4-90.3-90.3zM0 96C0 60.7 28.7 32 64 32l384 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zm160 48a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zm-64 0a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z" />
          </svg>
        </div>

        <span className="flex flex-col w-full">
          <>
            <span className="flex w-full justify-between">
              <p className="font-medium text-lg truncate text-ellipsis">
                {this.name}
              </p>
            </span>
          </>
          <>
            {!!this?.description && (
              <>
                <p className="text-sm text-gray-500 line-clamp-3">
                  {this.description}
                </p>
              </>
            )}
          </>
        </span>
      </article>
    );
  }
}
