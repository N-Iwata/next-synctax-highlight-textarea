module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      'prismjs',
      {
        languages: ['javascript', 'css', 'html', 'bash', 'yaml', 'md'],
        plugins: [],
        theme: 'okaidia',
        css: true,
      },
    ],
  ],
}
