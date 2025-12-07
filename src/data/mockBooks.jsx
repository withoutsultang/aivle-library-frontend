const mockBooksApiFormat = {
    status: "success",
    message: "조회 성공",
    data: {
        books: [
            {
                bookId: 1,
                title: "노인과 바다",
                coverImageUrl: "https://picsum.photos/200?random=1",
                createdAt: "2025-01-01T12:00:00",
                author: "어니스트 헤밍웨이"
            },
            {
                bookId: 2,
                title: "1984",
                coverImageUrl: "https://picsum.photos/200?random=2",
                createdAt: "2025-01-01T12:00:00",
                author: "조지 오웰"
            },
            {
                bookId: 3,
                title: "동물농장",
                coverImageUrl: "https://picsum.photos/200?random=3",
                createdAt: "2025-01-01T12:00:00",
                author: "조지 오웰"
            },
            {
                bookId: 4,
                title: "데미안",
                coverImageUrl: "https://picsum.photos/200?random=4",
                createdAt: "2025-01-01T12:00:00",
                author: "헤르만 헤세"
            },
            {
                bookId: 5,
                title: "호밀밭의 파수꾼",
                coverImageUrl: "https://picsum.photos/200?random=5",
                createdAt: "2025-01-01T12:00:00",
                author: "제롬 데이비드 샐린저"
            },
            {
                bookId: 6,
                title: "위대한 개츠비",
                coverImageUrl: "https://picsum.photos/200?random=6",
                createdAt: "2025-01-01T12:00:00",
                author: "스콧 피츠제럴드"
            },
            {
                bookId: 7,
                title: "죄와 벌",
                coverImageUrl: "https://picsum.photos/200?random=7",
                createdAt: "2025-01-01T12:00:00",
                author: "표도르 도스토옙스키"
            },
            {
                bookId: 8,
                title: "안나 카레니나",
                coverImageUrl: "https://picsum.photos/200?random=8",
                createdAt: "2025-01-01T12:00:00",
                author: "레프 톨스토이"
            },
            {
                bookId: 9,
                title: "모비딕",
                coverImageUrl: "https://picsum.photos/200?random=9",
                createdAt: "2025-01-01T12:00:00",
                author: "허먼 멜빌"
            },
            {
                bookId: 10,
                title: "셜록 홈즈",
                coverImageUrl: "https://picsum.photos/200?random=10",
                createdAt: "2025-01-01T12:00:00",
                author: "아서 코난 도일"
            },
            {
                bookId: 11,
                title: "해리포터와 마법사의 돌",
                coverImageUrl: "https://picsum.photos/200?random=11",
                createdAt: "2025-01-01T12:00:00",
                author: "J.K. 롤링"
            },
            {
                bookId: 12,
                title: "반지의 제왕",
                coverImageUrl: "https://picsum.photos/200?random=12",
                createdAt: "2025-01-01T12:00:00",
                author: "J.R.R. 톨킨"
            },
            {
                bookId: 13,
                title: "삼국지",
                coverImageUrl: "https://picsum.photos/200?random=13",
                createdAt: "2025-01-01T12:00:00",
                author: "나관중"
            },
            {
                bookId: 14,
                title: "연금술사",
                coverImageUrl: "https://picsum.photos/200?random=14",
                createdAt: "2025-01-01T12:00:00",
                author: "파울로 코엘료"
            },
            {
                bookId: 15,
                title: "백 년의 고독",
                coverImageUrl: "https://picsum.photos/200?random=15",
                createdAt: "2025-01-01T12:00:00",
                author: "가브리엘 가르시아 마르케스"
            },
            {
                bookId: 16,
                title: "어린 왕자",
                coverImageUrl: "https://picsum.photos/200?random=16",
                createdAt: "2025-01-01T12:00:00",
                author: "앙투안 드 생텍쥐페리"
            },
            {
                bookId: 17,
                title: "파울라",
                coverImageUrl: "https://picsum.photos/200?random=17",
                createdAt: "2025-01-01T12:00:00",
                author: "이사벨 아옌데"
            },
            {
                bookId: 18,
                title: "드라큘라",
                coverImageUrl: "https://picsum.photos/200?random=18",
                createdAt: "2025-01-01T12:00:00",
                author: "브램 스토커"
            },
            {
                bookId: 19,
                title: "프랑켄슈타인",
                coverImageUrl: "https://picsum.photos/200?random=19",
                createdAt: "2025-01-01T12:00:00",
                author: "메리 셸리"
            },
            {
                bookId: 20,
                title: "걸리버 여행기",
                coverImageUrl: "https://picsum.photos/200?random=20",
                createdAt: "2025-01-01T12:00:00",
                author: "조너선 스위프트"
            },
            {
                bookId: 21,
                title: "돈키호테",
                coverImageUrl: "https://picsum.photos/200?random=21",
                createdAt: "2025-01-01T12:00:00",
                author: "미겔 데 세르반테스"
            },
            {
                bookId: 22,
                title: "춘향전",
                coverImageUrl: "https://picsum.photos/200?random=22",
                createdAt: "2025-01-01T12:00:00",
                author: "작가 미상"
            },
            {
                bookId: 23,
                title: "홍길동전",
                coverImageUrl: "https://picsum.photos/200?random=23",
                createdAt: "2025-01-01T12:00:00",
                author: "허균"
            },
            {
                bookId: 24,
                title: "토지",
                coverImageUrl: "https://picsum.photos/200?random=24",
                createdAt: "2025-01-01T12:00:00",
                author: "박경리"
            },
            {
                bookId: 25,
                title: "칼의 노래",
                coverImageUrl: "https://picsum.photos/200?random=25",
                createdAt: "2025-01-01T12:00:00",
                author: "김훈"
            },
            {
                bookId: 26,
                title: "채식주의자",
                coverImageUrl: "https://picsum.photos/200?random=26",
                createdAt: "2025-01-01T12:00:00",
                author: "한강"
            },
            {
                bookId: 27,
                title: "82년생 김지영",
                coverImageUrl: "https://picsum.photos/200?random=27",
                createdAt: "2025-01-01T12:00:00",
                author: "조남주"
            },
            {
                bookId: 28,
                title: "지구 끝의 온실",
                coverImageUrl: "https://picsum.photos/200?random=28",
                createdAt: "2025-01-01T12:00:00",
                author: "김초엽"
            },
            {
                bookId: 29,
                title: "아몬드",
                coverImageUrl: "https://picsum.photos/200?random=29",
                createdAt: "2025-01-01T12:00:00",
                author: "손원평"
            },
            {
                bookId: 30,
                title: "기억 전달자",
                coverImageUrl: "https://picsum.photos/200?random=30",
                createdAt: "2025-01-01T12:00:00",
                author: "로이스 로리"
            }
        ]
    }
};

export default mockBooksApiFormat;
