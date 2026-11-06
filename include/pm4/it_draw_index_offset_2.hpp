#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItDrawIndexOffset2Def {
    static constexpr std::uint8_t opcode = 0x35;
    static constexpr std::string_view name = "IT_DRAW_INDEX_OFFSET_2";
    static constexpr std::string_view desc = "Indexed draw with base vertex offset applied to index fetches";
};
}
