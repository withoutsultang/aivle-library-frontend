"""Transcode an actual successful browser recording; no generated UI frames."""
from pathlib import Path
import subprocess
import imageio_ffmpeg
import hashlib
import json
from datetime import datetime, timezone, timedelta

root = Path(__file__).resolve().parents[1]
folder = root / 'docs/assets/demo'
source = folder / 'showcase.webm'
ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
subprocess.run([ffmpeg, '-y', '-hide_banner', '-loglevel', 'error', '-i', str(source), '-an',
                '-vf', 'scale=1280:-2', '-c:v', 'libx264', '-preset', 'medium', '-crf', '26',
                '-movflags', '+faststart', str(folder / 'showcase.mp4')], check=True)
subprocess.run([ffmpeg, '-y', '-hide_banner', '-loglevel', 'error', '-i', str(source),
                '-filter_complex', 'fps=6,scale=960:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=128[p];[b][p]paletteuse=dither=bayer:bayer_scale=3',
                '-loop', '0', str(folder / 'showcase-preview.gif')], check=True)
print('Actual recording exported to MP4 and GIF preview.')
frames = imageio_ffmpeg.read_frames(str(folder / 'showcase.mp4'))
metadata = next(frames)
frames.close()
assets = [p for p in folder.iterdir() if p.suffix in {'.png', '.webm', '.mp4', '.gif'}]
manifest = {
    'captureDateKST': datetime.fromtimestamp(source.stat().st_mtime, timezone(timedelta(hours=9))).date().isoformat(),
    'scope': 'Actual local demo browser render; sample accounts, books and covers; not historical AWS production footage.',
    'realComponents': ['React production demo build', 'Spring REST/Security/JPA', 'H2 SQL database'],
    'localAdapters': ['Demo session', 'Sample illustration provider', 'In-memory S3 adapter', 'Stubbed DynamoDB'],
    'durationSeconds': metadata['duration'],
    'videoSource': 'showcase.webm',
    'derivedFormats': ['showcase.mp4', 'showcase-preview.gif'],
    'files': [{'path': p.name, 'bytes': p.stat().st_size, 'sha256': hashlib.sha256(p.read_bytes()).hexdigest()} for p in sorted(assets)],
}
(folder / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
