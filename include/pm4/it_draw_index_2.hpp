#pragma once
#include <cstdint>
#include <string_view>

namespace pm4 {
struct ItDrawIndex2Def {
    static constexpr std::uint8_t opcode = 0x27;
    static constexpr std::string_view name = "IT_DRAW_INDEX_2";
    static constexpr std::string_view desc = "Indexed draw using alternate direct index buffer pointer format";
};
}
