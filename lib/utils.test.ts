import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn utility function', () => {
  it('単一のクラス名を返す', () => {
    expect(cn('foo')).toBe('foo')
  })

  it('複数のクラス名をマージする', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('条件付きクラス名を処理する', () => {
    expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz')
    expect(cn('foo', true && 'bar', 'baz')).toBe('foo bar baz')
  })

  it('undefined と null を適切に処理する', () => {
    expect(cn('foo', undefined, 'bar', null, 'baz')).toBe('foo bar baz')
  })

  it('空文字列を適切に処理する', () => {
    expect(cn('foo', '', 'bar')).toBe('foo bar')
  })

  it('Tailwind CSS のクラスをマージする', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4')
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
  })

  it('オブジェクト形式のクラス名を処理する', () => {
    expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz')
  })

  it('配列形式のクラス名を処理する', () => {
    expect(cn(['foo', 'bar'], 'baz')).toBe('foo bar baz')
  })

  it('複雑な組み合わせを処理する', () => {
    expect(
      cn(
        'base-class',
        { 'conditional-class': true },
        false && 'hidden-class',
        ['array-class-1', 'array-class-2'],
        'p-2',
        'p-4'
      )
    ).toBe('base-class conditional-class array-class-1 array-class-2 p-4')
  })
})
