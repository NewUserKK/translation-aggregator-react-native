export interface Either<A, B> {}

export class Left<A> implements Either<A, void> {
  constructor(readonly value: A) {}
}
export class Right<B> implements Either<void, B> {
  constructor(readonly value: B) {}
}

export function rightOf<B>(value: B): Either<void, B> {
  return new Right(value);
}

export function leftOf<A>(value: A): Either<A, void> {
  return new Left(value);
}


class EitherMatcher<A, B, R> {
  constructor(
    private readonly either: Either<A, B>,
    private result: R | null = null
    ) {}

  onLeft(block: (value: A) => R): EitherMatcher<A, B, R> {
    if (this.either instanceof Left) {
      this.result = block(this.either.value);
    }

    return this;
  }

  onRight(block: (value: B) => R): EitherMatcher<A, B, R> {
    if (this.either instanceof Right) {
      this.result = block(this.either.value);
    }

    return this;
  }
  
  match(): R {
    if (this.result != null) {
      return this.result;
    }

    throw "Unmatched result";
  }
}

export function matchEither<A, B, R>(either: Either<A, B>): EitherMatcher<A, B, R> {
  return new EitherMatcher(either);
}